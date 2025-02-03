export interface KleptonConfig {
  name: string
  description: string
  member_string: string
  member_count: number
  img_url: string
}

export type KleptonConfigs = {
  [key: string]: KleptonConfig
}

export const kleptonConfigs: KleptonConfigs = {
  javascript: {
    name: 'JavaScript',
    description:
      'The language *Kleptonix* is built on. Anything JavaScript and framework related belongs here.',
    member_string: 'Script Kiddies',
    member_count: 4,
    img_url:
      'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
  python: {
    name: 'Python',
    description:
      "Python is the most widely used language in the world. It's not only used for Data Science, but also for Web Development, and even for Machine Learning. It's also used to make videogames, such as the famous *Doki Doki Literature Club*, which uses a library called *RenPy* for visual novels. There are so many ways to use Python, that we can't wait what the community can come up with!",
    member_string: 'Pythonistas',
    member_count: 4,
    img_url:
      'https://images.unsplash.com/photo-1528158222524-d4d912d2e208?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2880&q=80',
  },
  rust: {
    name: 'Rust',
    description:
      "Feelin' a little Rusty on Rust? Talk all about the leading Data Science programming language here. It's apparently even used in Web Development, and much more!",
    member_string: 'Metalheads',
    member_count: 4,
    img_url:
      'https://images.unsplash.com/photo-1612174194811-0ab2ce2fb492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
  java: {
    name: 'Java',
    description:
      "Some people might say that Java is a programming language that exists, but we here at *k/java* don't believe such blatant lies. We know the truth, and the truth is that this so-called programming language is actually a horribly un-optimized version of C. You can't change our minds, but you can stop right in to chat about what you had for coffee in the morning. We won't judge (unless you really think Java is a real language), *we promise*.",
    member_string: 'Coffee Drinkers',
    member_count: 4,
    img_url:
      'https://images.unsplash.com/photo-1585332889055-059af80a9b5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80',
  },
  kleptonix: {
    name: 'Kleptonix',
    description:
      'The only Klepton that keeps you up to date about current development for the site. Come take a sneak peek at the most recent changes and new features coming to a future release of Kleptonix!',
    member_string: 'Klepters',
    member_count: 1,
    img_url:
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
}

export const getKleptonConfig = (klepton: string): KleptonConfig => {
  return (
    kleptonConfigs[klepton] || {
      name: klepton,
      description:
        'A community for discussing all things related to this topic.',
      member_string: 'Members',
      member_count: 0,
      img_url:
        'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    }
  )
}
