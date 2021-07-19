### Uninstall from Master node  
/usr/local/bin/k3s-uninstall.sh

### Uninstall k3 agent (worker nodes)  
/usr/local/bin/k3s-agent-uninstall.sh


### Prepare Worker Nodes  
sudo cat /var/lib/rancher/k3s/server/node-token  

export K3S_KUBECONFIG_MODE=644  
export K3S_URL=https://10.0.0.16:6443  
export K3S_TOKEN=K10d242b3f69d254128eac1522cbe0bc03a06a0b6f45f0b6f01d31d85ce8645d8::server:ebc4e6d370efcdbc6109d4be036655d5  


### Configure pi's hardware
Need to add following to file: /boot/firmware/cmdline.txt  
!caution: do not add a new line  
sudo sed -i '1s/^/cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory /'   

sudo reboot  
  
### handy
hostname naming:
sudo hostnamectl set-hostname "YOUR_PI_HOSTNAME"  

### Docker  
Kubernetes is used to manage Docker containers on hybrid cloud infrastructure. Thus we need to have docker up and running on all the nodes before we can setup K3s.  

### Install K3 Master and Workers  
follow this to install docker and k3s  
https://computingforgeeks.com/install-kubernetes-on-ubuntu-using-k3s/  



Read More:  
https://theselfhostingblog.com/posts/setting-up-a-kubernetes-cluster-using-raspberry-pis-k3s-and-portainer/   
https://medium.com/@yankee.exe/setting-up-multi-node-kubernetes-cluster-with-k3s-and-multipass-d4efed47fed5  

