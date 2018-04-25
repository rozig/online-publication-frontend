import { 
	Component, 
	OnInit,
	Input
} from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  //@Input() post;


    post = {
        "draft": false,
        "comments": [
            {
                "created_date": "2018-04-24T21:01:09.327Z",
                "_id": "5adf9b15e47eddfed36aae5c",
                "author": {
                    "_id": "5ade4591b953ffece0bd832e",
                    "firstname": "Enkhtulga",
                    "lastname": "Tseveenkhuu",
                    "email": "ts.enkhtulga@gmail.com",
                    "username": "eta31",
                    "profile_picture": "/assets/profile.jpg"
                },
                "text": "updated body123!"
            },
            {
                "created_date": "2018-04-24T21:01:42.473Z",
                "_id": "5adf9b36e47eddfed36aae5e",
                "author": {
                    "_id": "5ade4591b953ffece0bd832e",
                    "firstname": "Enkhtulga",
                    "lastname": "Tseveenkhuu",
                    "email": "ts.enkhtulga@gmail.com",
                    "username": "eta31",
                    "profile_picture": "/assets/profile.jpg"
                },
                "text": "Eta's 6th comment"
            },
            {
                "created_date": "2018-04-24T21:05:07.504Z",
                "_id": "5adf9c034f3d83feec25faea",
                "author": {
                    "_id": "5ade4591b953ffece0bd832e",
                    "firstname": "Enkhtulga",
                    "lastname": "Tseveenkhuu",
                    "email": "ts.enkhtulga@gmail.com",
                    "username": "eta31",
                    "profile_picture": "/assets/profile.jpg"
                },
                "text": "Eta's 8th comment"
            },
            {
                "created_date": "2018-04-25T00:51:52.669Z",
                "_id": "5adfd12800668dffb8aaf762",
                "author": {
                    "_id": "5ade4591b953ffece0bd832e",
                    "firstname": "Enkhtulga",
                    "lastname": "Tseveenkhuu",
                    "email": "ts.enkhtulga@gmail.com",
                    "username": "eta31",
                    "profile_picture": "/assets/profile.jpg"
                },
                "text": "Eta's 8th comment"
            }
        ],
        "upVotes": [],
        "downVotes": [
            {
                "created_date": "2018-04-25T07:25:23.889Z",
                "_id": "5ae02d63e65f7f087d9a30e1",
                "author": "5ade4591b953ffece0bd832e"
            }
        ],
        "created_date": "2018-04-24T17:56:15.021Z",
        "_id": "5adf6fbf2ddcf2fa9bd6f950",
        "title": "The Mistakes I Made As a Beginner Programmer",
        "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati voluptatum iusto itaque fugit dolorem temporibus sint officia fuga cupiditate consequuntur delectus, ipsam corporis. Dignissimos impedit nam excepturi ratione corporis?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati voluptatum iusto itaque fugit dolorem temporibus sint officia fuga cupiditate consequuntur delectus, ipsam corporis. Dignissimos impedit nam excepturi ratione corporis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati voluptatum iusto itaque fugit dolorem temporibus sint officia fuga cupiditate consequuntur delectus, ipsam corporis. Dignissimos impedit nam excepturi ratione corporis?",
        "author": {
            "_id": "5ade4591b953ffece0bd832e",
            "firstname": "Enkhtulga",
            "lastname": "Tseveenkhuu",
            "email": "ts.enkhtulga@gmail.com",
            "username": "eta31",
            "profile_picture": "/assets/profile.jpg"
        },
        "__v": 38,
        "updated_date": "2018-04-25T02:59:55.903Z"
    }


  // @Output() 
  constructor() { }

  ngOnInit() {
  }

}
