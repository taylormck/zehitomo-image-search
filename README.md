## Running the server

Run the server using the commands:
```bash
yarn build && yarn start
```

This will create a production build and run it locally.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the search page.

## Q&A

#### Do you have any strong rationale for why you chose specific ​development technologies​ for this project that you would like to share with the team?

For this project, I decided to take it as an opportunity to try a few things out for myself. May as well earn some experience while interviewing, after all.

First, I decided to build the app with Next.js. The easy reason why is that it handles a lot of otherwise tedious setup, giving me almost instant access to React, webpack, server-side rendering, and an backend API. However, I also had a more personal reason for going with it. I've worked on a few Next.js projects professionally, but I haven't yet had the chance to build one from scratch. This has left a few gaps in my knowledge about how it all works together. By building this image search app with it, I was able to fill in some of those spots. Now, I'll be able to go to work on more Next.js projects more confidently in the future.

Second, I wanted to try using Material UI as a UI framework. This one's simple: I've been working almost exclusively with React MD for the last few years, and I just really wanted to try something new. While working on it, there were a few hiccups here and there, and overall, the layout of come of the components ended up a bit less than optimal because of it. Still, I'm happy I tried it, as I always enjoy trying out new tools.

#### Do you have any strong rationale for why you made specific ​design​ decisions (​software architecture design​) over alternatives?

I definitely made some opinionated decisions while working on this project, though "strong rationale" may be overstating it a bit.

The decisions I made that will probably stick out the most was to use all functional components. I've always been a fan of functional programming, and React makes it both incredibly easy and efficient to use functional components.

I chose to make use the Unsplash API server-side rather than client-side, mostly because that's what's recommended, but also because that's just what made the most sense to me. This project only required the `search.photos` endpoint, which should be fine without the secret key, so it could be done client-side if we wanted, but I was 90% done doing it server-side by the time I figured that out.

As of writing this, I haven't implemented a proper database yet, instead relying on `localStorage` as a substitute. This was mostly due to time constraints.

###### Update

I've started on the database work in a separate branch. While the db is up and running, the UI isn't hooked up to it, and I'm simply out of time to work on this project. I'll push this separate branch up for anyone interested.

In order to run the database, you'll first need to set up an `.env` file in the root folder, based on the `.env/example` added in the repo:
```bash
# Database stuff
POSTGRES_VERSION=9.6-alpine
POSTGRES_PASSWORD=<your password here>
POSTGRES_USER=<your username here>
POSTGRES_DB=zehitomoimagesearch
COMPOSE_PROJECT_NAME=zehitomoimagesearch
```
Use whatever password or username you like.

Then start it up with docker:
```bash
docker-compose up -d
```

Finally, make sure to initialize the db using knex:
```bash
knex migrate:latest
```

#### Do you have any strong rationale for why you made specific ​implementation​ decisions over alternatives?

To be honest, I didn't have strong reasons for most implementation decisions. Most things simply came down to what would work and look somewhat organized despite the limited timeframe. I generally went with what was easy to finish on time, and stuck to pretty simple configurations and customizations wherever applicable.

#### [Optional] What else would you like to improve if you have more time? This can be in simple format like a TODO bullet points

If I have time tomorrow, I'll be using a proper database in the back end for storing favorites. While `localStorage` works for demonstration purposes, it's less than ideal. If you're reading this, I'm afraid I didn't have time to make that change (or I just forgot to update the readme).

I'd also like to rearrange a few of the components. I mentioned above that I'm new to Material UI, and that did cause me to make a few suboptimal component arrangements. There are a few components that grew a bit large which I'd love to break into smaller pieces, and a few components where I think some more re-use is in order.

Finally, I'd love to get around to some testing. Even if it's just a few simple snapshot tests on these components, it'd be great to get some coverage.

#### [Optional] If you feel like there are things you’d like to implement and/or fix, feel free to add a TODO section in your documentation

1. Use relational DB on the back-end for favorites
2. Refactor large components
3. Tests
