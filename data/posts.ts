export interface Post {
  id: string
  title: string
  author: string
  username: string
  klepton: string
  text: string
  views: number
  replies: number
}

export const defaultPosts: Post[] = [
  {
    id: 'welcome',
    title: 'Welcome to Kleptonix',
    author: 'Luis Bauza',
    username: 'luis',
    klepton: 'kleptonix',
    text: `##### Make yourself at home!
Kleptonix allows developers (like you and I) to quickly and easily get in touch with others to create something new. Communities are denoted by "Kleptons," and each Klepton has a different topic. It fits in with the site's name, after all!

##### How do I subscribe to a Klepton?
You'll first want to head to the Klepton's page. Since this website is under construction, Kleptons themselves haven't been implemented yet.

##### When will the website be finished?
There's always something new to add or a bug to fix. I don't anticipate development ever finishing but most functionality should be implemented within the next few years (this is a side project, after all).`,
    views: 1,
    replies: 1,
  },
  {
    id: 'javascript',
    title: 'The Beauty of JavaScript',
    author: 'John Doe',
    username: 'jdoe',
    klepton: 'javascript',
    text: `##### What is JavaScript?
JavaScript is a programming language designed to make your life easier. In fact, this website is made using a subset of JavaScript called TypeScript. You can think of it like an "extension" of JavaScript that allows for more control over types and keeps applications running more reliably.

##### Why should I care?
In addition to being one of the most widely used languages on the Web, JavaScript is also used for certain desktop applications. Node.js allows developers to create desktop applications using JavaScript. Making web applications becomes much easier and faster using this language. If this website is made using JavaScript, just imagine what you might be able to create using it!`,
    views: 0,
    replies: 0,
  },
  {
    id: 'python',
    title: 'Python is Cool',
    author: 'Bryan Grigorie',
    username: 'bgregz',
    klepton: 'python',
    text: `##### What is Python?
Python is one of the most popular programming languages. It's used to make Flask applications, and it's used to make Django applications. I use it everyday at work, and I've also made Django apps in the past for school.

##### Why is Python so popular?
You'll probably use Python in your job too, if you're not already using it. It's a great language to learn, and it's a great language to use. I've used Python for a lot of things, and I'm pretty sure I'll use it again. It's one of those languages that I don't think will ever die down in popularity, unless something even more efficient becomes available.

For those that are still learning programming, Python is a great starter language.`,
    views: 0,
    replies: 0,
  },
  {
    id: 'rust',
    title: 'Rust is Uncool',
    author: 'John Doe',
    username: 'jdoe',
    klepton: 'rust',
    text: `##### What is Rust?
Rust is a programming language. We don't need to talk about it, unless there's some reason why you need to crunch numbers.`,
    views: 0,
    replies: 0,
  },
  {
    id: 'java',
    title: 'Java is Not a Programming Language',
    author: 'Luis Bauza',
    username: 'luis',
    klepton: 'java',
    text: `##### What is Java?
Believe it or not, most developers don't know that Java refers to a cup of coffee and not a programming language.`,
    views: 0,
    replies: 0,
  },
]
