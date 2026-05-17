# Kubernetes Cluster Infrastructure

Terraform configuration to provision AWS infrastructure for a Kubernetes cluster (1 master + 1 worker node).

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) >= 1.0 installed
- AWS account with access credentials configured
- An existing EC2 key pair in your AWS account
- An existing security group ID

## Quick Start

1. **Initialize Terraform:**
   ```bash
   terraform init
   ```

2. **Copy the example variables file:**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. **Edit `terraform.tfvars`** with your values:
   ```hcl
   region             = "us-east-1"
   key_name           = "your-key-pair-name"
   security_group_id  = "sg-xxxxxxxxxxxxxxxxx"
   ```

4. **Plan the infrastructure:**
   ```bash
   terraform plan
   ```

5. **Apply the configuration:**
   ```bash
   terraform apply
   ```

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `region` | AWS region | `us-east-1` |
| `ami_id` | AMI for EC2 instances | Amazon Linux 2023 |
| `master_instance_type` | Master node instance type | `t2.micro` |
| `worker_instance_type` | Worker node instance type | `t2.micro` |
| `key_name` | SSH key pair name | (required) |
| `security_group_id` | Existing security group ID | (required) |
| `vpc_cidr` | VPC CIDR block | `10.0.0.0/16` |

## Outputs

After `terraform apply`, you'll see:
- VPC ID
- Master node: Instance ID, Public IP, Private IP
- Worker node: Instance ID, Public IP, Private IP
- Subnet IDs
- Internet Gateway ID

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                          VPC (10.0.0.0/16)                  │
│                                                              │
│  ┌────────────────────────┐    ┌────────────────────────┐   │
│  │   Master Subnet        │    │   Worker Subnet        │   │
│  │   10.0.1.0/24          │    │   10.0.2.0/24          │   │
│  │   us-east-1a           │    │   us-east-1b           │   │
│  │                        │    │                        │   │
│  │  ┌──────────────┐      │    │  ┌──────────────┐      │   │
│  │  │ Master Node  │      │    │  │ Worker Node  │      │   │
│  │  │ t2.micro     │      │    │  │ t2.micro     │      │   │
│  │  │ Public IP    │      │    │  │ Public IP    │      │   │
│  │  └──────────────┘      │    │  └──────────────┘      │   │
│  └───────────┬────────────┘    └───────────┬────────────┘   │
│              │                             │                │
│              └──────────┬──────────────────┘                │
│                         │                                   │
│              ┌──────────▼──────────┐                        │
│              │  Internet Gateway   │                        │
│              └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Next Steps

After provisioning:
1. SSH into both instances using the key pair
2. Install Kubernetes (kubeadm, kubectl, kubelet)
3. Initialize master node: `kubeadm init`
4. Join worker node to cluster

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

## Free Tier Notes

- `t2.micro` instances are free tier eligible
- Ensure you stop instances when not in use to avoid charges
- Data transfer and EBS storage may incur charges