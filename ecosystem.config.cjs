module.exports = {
  apps: [
    {
      name: "sportzone",
      script: "npm",
      args: "run dev",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],

  deploy: {
    dev: {
      user: "strapi",
      host: "34.92.72.76/",
      key: "~/.ssh/id_ed25519",
      ref: "origin/main",
      repo: "git@github.com:Zvkkaaa/sportzone-hub.git",
      path: "/opt/sportzone-hub",
      "post-deploy":
        "npm install && rm -rf dist && npm run build && pm2 reload ecosystem.config.js",
    },

    prod: {
      user: "strapi",
      host: "34.92.72.76/",
      ref: "origin/main",
      repo: "git@github.com:Zvkkaaa/sportzone-hub.git",
      path: "/opt/sportzone-hub",
      "post-deploy":
        "npm install && rm -rf dist && npm run build && pm2 reload ecosystem.config.js",
    },
  },
};
