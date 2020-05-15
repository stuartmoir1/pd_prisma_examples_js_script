const { PrismaClient } = require('@prisma/client');
const { dataUser1, dataUser2, dataNewPost } = require('./data');

const prisma = new PrismaClient();

//

const createUser = async ({ email, name, posts }, isInclPosts) => {
  const user = await prisma.user.create({
    data: { email, name, posts },
    include: { posts: isInclPosts }
  });
  return user;
}

const createPost = async ({ title, content, published, authorEmail }) => {
  const post = await prisma.post.create({
    data: { title, content, published,
      author: { connect: { email: authorEmail } }
    }
  });
  return post;
}

const publishPost = async id => {
  const post = await prisma.post.update({
    where: { id },
    data: { published: true }
  });
  return post;
}

const postsByUser = async email => {
  const posts = await prisma.user
    .findOne({ where: { email } })
    .posts();
  return posts;
}

//

async function main() {

  const user1 = await createUser(dataUser1, true);
  console.log(`Created user: ${user1.name} (posts: ${user1.posts.length})`);
  
  const user2 = await createUser(dataUser2, true);
  console.log(`Created user: ${user2.name} (posts: ${user2.posts.length})`);

  const allPublishedPosts = await prisma.post.findMany({
    where: { published: true }
  });
  console.log('Retrieved all public posts:', allPublishedPosts, '\n');

  const newPost = await createPost(dataNewPost);
  console.log('Created a new post:', newPost, '\n');

  const updatedPost = await publishPost(newPost.id);
  console.log('Published new post:', updatedPost, '\n');

  const postsUser1 = await postsByUser(user1.email);
  console.log('User1 posts:', postsUser1, '\n');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.disconnect();
  });
