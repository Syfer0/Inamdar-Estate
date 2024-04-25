# Rest cmd

git reset --hard 03800368e6316c61d37d5a590455098993f8ba84

# CMD

find . -type f -name '\*.js' -exec bash -c 'mv "$1" "${1%.js}.ts"' \_ {} \;

npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-p node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

=> convet all file js to ts

# imp

    "build": "npm install && npm install --prefix client && npm run build --prefix client"

    "scripts": {
    "dev": "nodemon --exec ts-node api/index.ts",
    "start": "node dist/index.js",
    "build": "tsc"

},
