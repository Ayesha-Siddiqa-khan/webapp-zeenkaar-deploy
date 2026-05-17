output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "subnet_ids" {
  description = "IDs of the subnets"
  value       = [aws_subnet.master.id, aws_subnet.worker.id]
}

output "master_subnet_id" {
  description = "ID of the master subnet"
  value       = aws_subnet.master.id
}

output "worker_subnet_id" {
  description = "ID of the worker subnet"
  value       = aws_subnet.worker.id
}

output "master_instance_id" {
  description = "Instance ID of the master node"
  value       = aws_instance.master.id
}

output "worker_instance_id" {
  description = "Instance ID of the worker node"
  value       = aws_instance.worker.id
}

output "master_public_ip" {
  description = "Public IP of the master node"
  value       = aws_instance.master.public_ip
}

output "worker_public_ip" {
  description = "Public IP of the worker node"
  value       = aws_instance.worker.public_ip
}

output "master_kubeconfig_endpoint" {
  description = "Kubernetes API server endpoint using the master public IP"
  value       = "https://${aws_instance.master.public_ip}:6443"
}

output "iam_user_name" {
  description = "IAM user name created for AWS access"
  value       = aws_iam_user.cluster_user.name
}

output "iam_access_key_id" {
  description = "Access key ID for the IAM user"
  value       = aws_iam_access_key.cluster_user.id
}

output "iam_secret_access_key" {
  description = "Secret access key for the IAM user"
  value       = aws_iam_access_key.cluster_user.secret
  sensitive   = true
}
