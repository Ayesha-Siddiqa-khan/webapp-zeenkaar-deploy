resource "aws_iam_user" "cluster_user" {
  name = var.iam_user_name
}

resource "aws_iam_access_key" "cluster_user" {
  user = aws_iam_user.cluster_user.name
}

resource "aws_iam_user_policy_attachment" "cluster_user_ec2" {
  user       = aws_iam_user.cluster_user.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}
