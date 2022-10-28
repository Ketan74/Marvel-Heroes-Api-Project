import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MarvelReviewService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5000/';

  signIn(userName: string, password: string) {
    const signInUrl = this.baseUrl + 'auth/login';
    return this.http.post(signInUrl, {
      userName: userName,
      password: password,
    });
  }

  register(name: string, email: string, userName: string, password: string) {
    const registerUrl = this.baseUrl + 'auth/register';
    return this.http.post(registerUrl, {
      name: name,
      email: email,
      userName: userName,
      password: password,
    });
  }

  verify() {
    const verifyUrl = this.baseUrl + 'auth/is-verify';
    return this.http.get(verifyUrl, {
      headers: { token: `${sessionStorage.getItem('token')}` },
    });
  }

  postReivew(userSrNo: number, characterId: string, reviewMessage: string) {
    const postReivewUrl = this.baseUrl + 'review/postReview';
    return this.http.post(postReivewUrl, {
      userSrNo: userSrNo,
      characterId: characterId,
      reviewMessage: reviewMessage,
    });
  }

  getReviews(characterId: string) {
    const getReviewsUrl = this.baseUrl + `review/${characterId}`;
    return this.http.get(getReviewsUrl);
  }

  updateReview(userSrNo: number, characterId: string, reviewMessage: string) {
    const updateReviewUrl = this.baseUrl + 'review/updateReview';
    return this.http.put(updateReviewUrl, {
      userSrNo: userSrNo,
      characterId: characterId,
      reviewMessage: reviewMessage,
    });
  }

  deleteReview(userSrNo: number, characterId: string) {
    const deleteReviewUrl = this.baseUrl + `review/${userSrNo}/${characterId}`;
    return this.http.delete(deleteReviewUrl);
  }
}
