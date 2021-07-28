## Kubernetes on Pi  

Create a K8 cluster from scratch for fun , profit and learning (this document is for exploration/learning purpose only)  

### 🏐 Hardware:  
  Basic understanding of different processor type (armhf, amd64 etc.)  
  Few Pi's (Pi 4 with 8M is the best) , SD cards with ubuntu 20.04 (64 bits for Pi 4, 32 bits for Pi 3)  
  Optional: A 8-port switch (preferably with PoE)  
  Pi Zero's (Broadcom BCM2835) can't be used as cluster node  
  
### 🏐 Alternative Hardware Choices: 
  - AWS EC2 instances (tiny), 
  - Your pc/laptop (create ubuntu VMs with `Multipass launch`)  

### Software requirement:  
Used Rancher's K8S kubernetes distro, it is lightweight, officially supported by CNCF (unlike mikrok8, Minikube, it is production quality and designed for production workloads across resource constrained, remote locations or on IoT devices, it is also optimized for ARM).  
The cluster of 3 nodes  
- Master: Pi 4  
- Worker-01: Pi 3  
- Worker-02 (ubuntu VM on a laptop, example: multipass launch --cpus 1 --mem 1G --disk 2G --name worker-02 )  
  Use ssh_authorized_keys in all nodes, so they can access each other (ssh-copy-id)  
   


![pi-cluster](https://github.com/ObjectMatrix/k3sonpi/blob/main/piKube.png)

### 🏐 Prepare Worker Nodes  
sudo cat /var/lib/rancher/k3s/server/node-token  

export K3S_KUBECONFIG_MODE=644  
export K3S_URL=https://10.0.0.16:6443  
export K3S_TOKEN=K10d242b3f69d254128eac1522cbe0bc03a06a0b6f45f0b6f01d31d85ce8645d8::server:ebc4e6d370efcdbc6109d4be036655d5  


### 🏐 Configure pi's hardware  
Need to add following to file: /boot/firmware/cmdline.txt    
!caution: do not add a new line  
sudo sed -i '1s/^/cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory /'    

sudo reboot  
  
### handy dandy
hostname naming:
sudo hostnamectl set-hostname "YOUR_PI_HOSTNAME"  

### 🏐 Docker  
Kubernetes is used to manage Docker containers on hybrid cloud infrastructure. Thus we need to have docker up and running on all the nodes before we can setup K3s. ![caution] for 32 bit and arm processor follow following link
https://withblue.ink/2019/07/13/yes-you-can-run-docker-on-raspbian.html


###  🏐 Install K3 Master and Workers  
follow this to install docker and k3s  

- ⭐⭐⭐ https://theselfhostingblog.com/posts/setting-up-a-kubernetes-cluster-using-raspberry-pis-k3s-and-portainer/amp/   (with Portainer)
- ⭐  https://computingforgeeks.com/install-kubernetes-on-ubuntu-using-k3s/  

###  🏐 Config
copy this file from Master
/etc/rancher/k3s/k3s.yaml   
to each Worker  
${HOME}/.kube/k3s.yaml  
### Node Selector Command:  
You can use this command to label all nodes  
kubectl label nodes <your node name> nodePool=cluster  
  Example:  
>  kubectl label nodes worker-01 nodePool=cluster
  
### Assign role names:
  > kubectl label node worker-01 node-role.kubernetes.io/worker1=worker1
  > kubectl label node macbook node-role.kubernetes.io/worker2=worker2
  
###  🏐  Uninstall K3S  
 - /usr/local/bin/k3s-uninstall.sh   (server)
 - /usr/local/bin/k3s-agent-uninstall.sh (workers)
 - 

 🏐  Read More:  
  - https://levelup.gitconnected.com/kubernetes-cluster-with-k3s-and-multipass-7532361affa3  
  - https://theselfhostingblog.com/posts/setting-up-a-kubernetes-cluster-using-raspberry-pis-k3s-and-portainer/   
  - https://medium.com/@yankee.exe/setting-up-multi-node-kubernetes-cluster-with-k3s-and-multipass-d4efed47fed5  

