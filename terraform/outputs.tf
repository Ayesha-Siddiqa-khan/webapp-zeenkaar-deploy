# =============================================================================
# VPC Outputs
# =============================================================================

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "vpc_dns_hostnames" {
  description = "Whether DNS hostnames are enabled"
  value       = aws_vpc.main.enable_dns_hostnames
}

# =============================================================================
# Subnet Outputs
# =============================================================================

output "master_subnet_id" {
  description = "ID of master node subnet"
  value       = aws_subnet.master.id
}

output "worker_subnet_id" {
  description = "ID of worker node subnet"
  value       = aws_subnet.worker.id
}

# =============================================================================
# EC2 Instance Outputs
# =============================================================================

output "master_instance_id" {
  description = "Instance ID of master node"
  value       = aws_instance.master.id
}

output "master_public_ip" {
  description = "Public IP address of master node"
  value       = aws_instance.master.public_ip
}

output "master_private_ip" {
  description = "Private IP address of master node"
  value       = aws_instance.master.private_ip
}

output "worker_instance_id" {
  description = "Instance ID of worker node"
  value       = aws_instance.worker.id
}

output "worker_public_ip" {
  description = "Public IP address of worker node"
  value       = aws_instance.worker.public_ip
}

output "worker_private_ip" {
  description = "Private IP address of worker node"
  value       = aws_instance.worker.private_ip
}

# =============================================================================
# Internet Gateway Output
# =============================================================================

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}