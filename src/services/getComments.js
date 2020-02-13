import axios from 'axios';

class GetComments {
  constructor() {
    this.endpoint = 'https://5cbef81d06a6810014c66193.mockapi.io/api/comments/';
  }

  addComment(data) {
    return axios.post(this.endpoint, data)
      .then(response => response)
      .catch(error => error);
  }

  getComments() {
    return axios.get(this.endpoint)
      .then(response => response.data)
      .catch(error => error);
  }

  getComment(id) {
    return axios.get(this.endpoint + id)
      .then(response => response.data)
      .catch(error => error);
  }

  deleteComment(id) {
    return axios.delete(this.endpoint + id)
      .then(response => response)
      .catch(error => error);
  }

  editComment(data, id) {
    return axios.put(this.endpoint + id, data)
      .then(response => response)
      .catch(error => error);
  }
}

const getCommentsData = new GetComments();

export default getCommentsData;
