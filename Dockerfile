FROM zenika/alpine-chrome:with-node

ARG NEXT_PUBLIC_FATHOM_CODE
ARG NEXT_PUBLIC_SITE_URL

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml .pnpmfile.cjs ./

RUN pnpm install --frozen-lockfile --prod

# Bundle app source
COPY . .

# Build
RUN pnpm build

# Start
CMD [ "pnpm", "start" ]
