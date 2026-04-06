module.exports = {
  apps: [
    {
      name: "sportzone",
      script: "npm",
      args: "run preview",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],

  deploy: {
    prod: {
      user: "strapi",
      host: "34.92.72.76",
      key: "~/.ssh/id_ed25519",
      ssh_options: 'StrictHostKeyChecking=no',
      env: {
        NVM_DIR: "/home/strapi/.nvm",
        PATH: "/home/strapi/.nvm/versions/node/v20.20.2/bin:/usr/bin:/bin"
      },
      "pre-setup": "echo 'pre-setup ok'",
      ref: "origin/main",
      repo: "git@github.com:Zvkkaaa/sportzone-hub.git",
      path: "/opt/sportzone-hub",
      "post-deploy":
        "npm install && rm -rf dist && npm run build && pm2 reload ecosystem.config.js",
    },
  },
};
