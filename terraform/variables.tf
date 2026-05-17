# AWS Region
variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

# AMI ID for EC2 instances (Amazon Linux 2023)
variable "ami_id" {
  description = "AMI ID for EC2 instances"
  type        = string
  default     = "ami-091138d0f0d41ff90"
}

# Master node instance type
variable "master_instance_type" {
  description = "EC2 instance type for master node"
  type        = string
  default     = "t3.small"
}

# Worker node instance type (Free Tier eligible)
variable "worker_instance_type" {
  description = "EC2 instance type for worker node"
  type        = string
  default     = "t3.micro"
}

# Existing key pair name
variable "key_name" {
  description = "my-key"
  type        = string
  default     = ""
}

# Existing security group ID
variable "security_group_id" {
  description = "ID of existing security group for EC2 instances"
  type        = string
  default     = "sg-0000863b167e94903"
}

# VPC CIDR block
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# Subnet CIDR blocks
variable "master_subnet_cidr" {
  description = "CIDR block for master node subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "worker_subnet_cidr" {
  description = "CIDR block for worker node subnet"
  type        = string
  default     = "10.0.2.0/24"
}

# Availability zones
variable "master_availability_zone" {
  description = "Availability zone for master node"
  type        = string
  default     = "us-east-1a"
}

variable "worker_availability_zone" {
  description = "Availability zone for worker node"
  type        = string
  default     = "us-east-1b"
}

# Tags
variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "kubernetes-cluster"
}