sudo cat /var/lib/rancher/k3s/server/node-token  

export K3S_KUBECONFIG_MODE=644  

export K3S_URL=https://10.0.0.999:6443  

export K3S_TOKEN=K10d242b3f69d254128eac1522cbe0bc03a06a0b6f45f0b6f01d31d85ce8645d8::server:ebc4e6d370efcdbc6109d4be036655d5  


### configure pi's  

$ sudo hostnamectl set-hostname "pi-one"  
$ sudo sed -i '1s/^/cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory /' /boot/firmware/cmdline.txt  
$ sudo reboot  
  


https://theselfhostingblog.com/posts/setting-up-a-kubernetes-cluster-using-raspberry-pis-k3s-and-portainer/  

