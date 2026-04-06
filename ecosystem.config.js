module.exports = {
  apps: [{
    name: 'sportzone’,
    script: 'npm run start:prod',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }],

  deploy: {
    dev: {
      user: 'strapi',
      host: '35.220.201.97',
      ref: 'origin/main',
      path: '/opt/sportzone-hub',
      repo: 'git@github.com:Zvkkaaa/sportzone-hub.git',
      'post-deploy': 'npm install && rm -rf dist && npm run build && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    },
    prod: {
      user: 'strapi',
      host: '35.220.201.97',
      ref: 'origin/main',
      path: '/opt/sportzone-hub',
      repo: 'git@github.com:Zvkkaaa/sportzone-hub.git',
      'post-deploy': 'npm install && rm -rf dist && npm run build && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    }
  }
}
