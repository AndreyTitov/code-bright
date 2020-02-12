import axios from 'axios';

class GetComments {
  constructor() {
    this.endpoint = 'https://5cbef81d06a6810014c66193.mockapi.io/api/comments/';
  }

  addComment(data) {
    return axios.post(this.endpoint, data)
      .then(response => response)
      .catch((error) => {
        console.log(error);
      });
  }

  getComments() {
    return axios.get(this.endpoint)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return console.log('error');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getComment(id) {
    return axios.get(this.endpoint + id)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        }
        return console.log('error');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteComment(id) {
    return axios.delete(this.endpoint + id)
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        return console.log('error');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editComment(data, id) {
    return axios.put(this.endpoint + id, data)
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        return console.log('error');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const getCommentsData = new GetComments();

export default getCommentsData;
