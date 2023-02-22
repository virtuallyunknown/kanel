### Clone and create a local repository

```bash
git clone https://github.com/virtuallyunknown/kanel.git && cd kanel
npm install
npm run build --workspace kanel
cd packages/kanel && sudo npm link
```

### Create another project and link the repo

```bash
mkdir kanel-esm-test && cd kanel-esm-test
npm init -y
sudo npm link kanel
touch kanel.js
```

### Modify package.json to use ESM and create a config file

```json
// package.json
{
  "name": "kanel-esm-test",
  "type": "module"
}
```

```js
// kanel.js
import { processDatabase, generateIndexFile } from 'kanel';

await processDatabase({
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'dvdrental',
    charset: 'utf8',
    port: 5432,
  },

  outputPath: 'out',
  resolveViews: false,
  preDeleteOutputFolder: true,
  enumStyle: 'type',
  preRenderHooks: [generateIndexFile],
});
```

### Run it

```bash
node kanel.js
```
