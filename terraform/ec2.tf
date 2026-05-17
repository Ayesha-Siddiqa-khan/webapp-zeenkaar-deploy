# =============================================================================
# EC2 Instances for Kubernetes
# =============================================================================

# Use default security group from the VPC
resource "aws_default_security_group" "default" {
  vpc_id = aws_vpc.main.id

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow SSH from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Kubernetes ports - Master node
  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Kubernetes API server
  }

  ingress {
    from_port   = 2379
    to_port     = 2380
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]  # etcd
  }

  ingress {
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]  # kubelet
  }

  # NodePort range (30000-32767) for services
  ingress {
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all inbound within VPC
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  tags = {
    Name = "${var.project_name}-default-sg"
  }
}

# Master Node
resource "aws_instance" "master" {
  ami           = var.ami_id
  instance_type = var.master_instance_type
  subnet_id     = aws_subnet.master.id

  # Use default security group from our VPC
  vpc_security_group_ids = [aws_default_security_group.default.id]

  # Use existing key pair (key_name must be provided)
  key_name = var.key_name

  # Root volume
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-master"
    Role = "kubernetes-master"
  }
}

# Worker Node
resource "aws_instance" "worker" {
  ami           = var.ami_id
  instance_type = var.worker_instance_type
  subnet_id     = aws_subnet.worker.id

  # Use default security group from our VPC
  vpc_security_group_ids = [aws_default_security_group.default.id]

  # Use existing key pair (key_name must be provided)
  key_name = var.key_name

  # Root volume (smaller for free tier)
  root_block_device {
    volume_size = 8
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-worker"
    Role = "kubernetes-worker"
  }
}