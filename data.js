const dataUser1 = {
  email: 'alice@prisma.io',
  name: 'Alice',
  posts: {
    create: {
      title: 'Watch the talks from Prisma Day 2019',
      content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
      published: true
    }
  }
};

const dataUser2 = {
  email: 'bob@prisma.io',
  name: 'Bob',
  posts: {
    create: [
      {
        title: 'Subscribe to GraphQL Weekly for community news',
        content: 'https://graphqlweekly.com/',
        published: true,
      },
      {
        title: 'Follow Prisma on Twitter',
        content: 'https://twitter.com/prisma/',
        published: false,
      }
    ]
  }
};

const dataNewPost = {
  title: 'Join the Prisma Slack community',
  content: 'http://slack.prisma.io',
  published: false,
  authorEmail: 'alice@prisma.io'
};

module.exports = {
  dataUser1,
  dataUser2,
  dataNewPost
};
