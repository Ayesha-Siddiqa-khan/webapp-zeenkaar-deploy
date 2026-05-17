resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_subnet" "master" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.master_subnet_cidr
  availability_zone       = var.master_availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-subnet-master"
  }
}

resource "aws_subnet" "worker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.worker_subnet_cidr
  availability_zone       = var.worker_availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-subnet-worker"
  }
}

resource "aws_route_table" "master" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-rt-master"
  }
}

resource "aws_route_table" "worker" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-rt-worker"
  }
}

resource "aws_route_table_association" "master" {
  subnet_id      = aws_subnet.master.id
  route_table_id = aws_route_table.master.id
}

resource "aws_route_table_association" "worker" {
  subnet_id      = aws_subnet.worker.id
  route_table_id = aws_route_table.worker.id
}
