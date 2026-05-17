# Terraform - Self-Managed Kubernetes Infrastructure

This Terraform project provisions AWS infrastructure for a self-managed Kubernetes setup (1 master + 1 worker). It only creates the infrastructure. You will install and configure Kubernetes manually afterward.

## Prerequisites

- Terraform >= 1.0
- AWS credentials configured locally (profile or environment variables)
- An existing EC2 key pair in your AWS account

## Quick Start

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit `terraform.tfvars` and set your values (region, key pair name, etc.).

4. Plan and apply:
   ```bash
   terraform plan
   terraform apply
   ```

## What It Creates

- VPC with two public subnets
- Internet gateway and route tables
- One master EC2 instance (t3.small)
- One worker EC2 instance (t3.micro)
- Default VPC security group configured with Kubernetes ports
- IAM user `AhmadYar` with an access key and `AmazonEC2FullAccess`

## Outputs

Key outputs include:

- VPC ID and subnet IDs
- Master/worker instance IDs
- Master/worker public IPs
- `master_kubeconfig_endpoint` for kubeconfig server address
- IAM access key (secret is marked sensitive)

To read the secret key after apply:
```bash
terraform output -raw iam_secret_access_key
```
