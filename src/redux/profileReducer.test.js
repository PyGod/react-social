import profileReducer, { addPost, deletePost } from './profileReducer';

let state = {
  postsData: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post!", likesCount: 3 },
  ],
};

it('length of posts should be increment', () => {
  let action = addPost('I am new post');

  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(3);
});

it('after deleting post posts should be decrement', () => {
  let action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(1);
});
