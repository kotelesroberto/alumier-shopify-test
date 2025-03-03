# Interview test for Alumier

This solution belongs to Alumier.

I decided to make the tasks done on my localhost and I used Shopify CLI for doing the job done. VITE is a recommended development tool that supports React / Typescript.

## Steps

### 1\. step: Create a Shopify store

Go to [https://partners.shopify.com/](https://partners.shopify.com/) .

Under the Stores menu item I had to define the purpose of creating teh store, that was "test and build", of course. After filling the neccessary fields (store name, current build, start with test data) the Partners site asked me to join to an existing partner OR create a new partner. Hence the Alumier Task guideline doesn't say anything about the existence of a Partner Store I had to create a brand new Partner on my own. Easy piecy.

After all the system generated the templated Shopify store (that is available under the Stores) and it was the time to start doing the small settings afterwards. I wondered if the theme will be touched regarding to the TASK, therefore I installed the debut-vintage-theme theme that was simply available from the Shopify store. I like the pure and simple design of it, I am sure it will help to write matching parts in Liquid later. No overthinking, no overcomplicating the task, just keep it simple.

### 2\. step: Download the specific theme from Shopify.

On the shopify admin dashboard, next tothe name of the current theme (Dawn) open the 3 dots menu and select "Donwload theme file". It generates a ZIP file that is downloadable to localhost.

### 3\. step: Create a VITE project locally:

- Type: `npm init vite`
- From the list select: React, Typescript
- Type and run: `npm install`
- Type and run: `npm run build`

4\. step: run the theme on localhost

Type and run:

`shopify theme dev --store=https://alumier-test.myshopify.com/`

### 5\. step initialize GIT within the project folder:

`git init`  
`git commit -m "first commit"`  
`git branch -M main`  
`git remote add origin git@github.com:kotelesroberto/alumier-shopify-test.git`  
`git push -u origin main`
