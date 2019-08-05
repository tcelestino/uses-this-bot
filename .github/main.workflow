workflow "deploy" {
  on = "push"
  resolves = ["GitHub Action for Heroku"]
}

action "GitHub Action for Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
}
