# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json  ./
RUN npm config set registry https://registry.npmmirror.com
# 安装依赖
RUN npm install

# 复制应用代码
COPY . ./

# 暴露开发服务器端口
EXPOSE 3000

# 启动开发服务器
CMD ["npm", "start"]
