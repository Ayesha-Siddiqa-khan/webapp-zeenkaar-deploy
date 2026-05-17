variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances (Amazon Linux 2023)"
  type        = string
  default     = "ami-091138d0f0d41ff90"
}

variable "master_instance_type" {
  description = "EC2 instance type for the master node"
  type        = string
  default     = "t3.small"
}

variable "worker_instance_type" {
  description = "EC2 instance type for the worker node"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Existing EC2 key pair name for SSH access"
  type        = string
  default     = "my-key"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "master_subnet_cidr" {
  description = "CIDR block for the master subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "worker_subnet_cidr" {
  description = "CIDR block for the worker subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "master_availability_zone" {
  description = "Availability zone for the master subnet"
  type        = string
  default     = "us-east-1a"
}

variable "worker_availability_zone" {
  description = "Availability zone for the worker subnet"
  type        = string
  default     = "us-east-1b"
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
  default     = "kubernetes-cluster"
}

variable "iam_user_name" {
  description = "IAM user name to create for AWS access"
  type        = string
  default     = "AhmadYar"
}
