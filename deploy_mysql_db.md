# Install MySQL on Kubernetes    

We will create configures and apply them to create a MySQL service. All configure files below must be applied after created with command:

kubectl apply -f <config-name>.yaml

### Prepare MySQL Data Storage 
Let us create a volume for our MySQL service to store data.2

At first, we need create a directory on node with command:

mkdir /mnt/data

### Then, create a configure file for persistent volume.
---
  
# pv.yaml.  
  
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-data-pv-volume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"  # the directory created on node
 ---
 
 ### After created, we can claim it on Kubernetes. Here is the config file:
 
  # pvc.yaml.   
 
--- 
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-data-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi  # the storage should be less than capacity in persistent volue
 

---


### Adding A Secret with MySQL Password 
The passsword of mysql we will use later should be injected into the pod environment by using the Secret.

Note that the value must be encoded using base643.

Says that the password is “mypassword”.

echo -n 'mypassword' | base64
The output bXlwYXNzd29yZA== should be put into our secret configure file.

---
# secret.yaml.  
  
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
type: Opaque
data:
  password: bXlwYXNzd29yZA==  # encoded base64 password
  
  
---

Creating Deployment with a MySQL Container 
Specifying image to create a container in pod.
Using PersistentVolumeClaim as volume.
Using Secret as environment variables.

---
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  labels:
    app: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      volumes:
        - name: mysql-data-storage
          persistentVolumeClaim:
            claimName: mysql-data-pv-claim
      containers:
        - name: mysql-container
          image: jsurf/rpi-mariadb
          ports:
            - containerPort: 3306
              name: "mysql-port"
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: password
          volumeMounts:
            - mountPath: "/var/lib/mysql"
              name: mysql-data-storage
              
---              
Expose the Service 
After the deployment applied and the pod is running. The MySQL service is not exposed to the node. We need to create a Service to listen the port on node.
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  type: NodePort
  selector:
    app: mysql
  ports:
    - protocol: TCP
      port: 3306
      targetPort: 3306
      nodePort: 30006
---


connet to your new database with a MySQL client.

mysql -P 30006 -h <raspberry-pi-host> -u root -p
All done!


