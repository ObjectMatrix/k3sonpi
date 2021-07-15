Following @kremerol solution, I was able to get my RPI 4 with Ubuntu 20.04 working.

Run sudo nano /boot/firmware/cmdline.txt

Edit the default file to look like below.

 net.ifnames=0 dwc_otg.lpm_enable=0 console=serial0,115200 cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc
NOTE: These are the 3 settings to add:

cgroup_enable=cpuset
cgroup_enable=memory
cgroup_memory=1
Save the file and reboot and the node status will change to ready.

You can check the status by running sudo microk8s.kubectl get nodes
