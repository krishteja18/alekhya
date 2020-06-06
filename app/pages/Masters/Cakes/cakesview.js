import React from "react";
import axios from "axios";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      favouriteItems: [],
    };
  }
  static getDerivedStateFromProps(nextProps){
console.log(nextProps.data,"nex")
}
  // this is using axios, without axios we can use redux format by passing the state of store
  componentDidMount() {
    axios.get("http://www.mocky.io/v2/5ed68221340000480106dae9").then((res) => {
      console.log(res);

      this.setState({
        posts: res.data,
      });
    });
    this.props.dispatch({
      type: 'cakes/actionSample',
      payload: {
        favouriteItems: this.state.favouriteItems
      }
    })
  }
  handleClick = (postId) => {
    if (this.state.favouriteItems.indexOf(postId) == -1) {
      this.setState({ favouriteItems: [...this.state.favouriteItems, postId] });
      this.props.dispatch({
        type: 'cakes/actionSample',
        payload: {
          favouriteItems: [...this.state.favouriteItems, postId] 
        }
      })
    } else {
      const array1 = this.state.favouriteItems.filter((id) => id != postId);
      this.setState({ favouriteItems: array1 });
    }
  };

  render() {
    const { favouriteItems } = this.state;
    console.log(favouriteItems, "items");
    console.log(this.props.data,"data");
    

    const mystyle = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    };
    const icon = {
      position: "relative",
      top: "-195px",
      float: "right",
      right: "2px",
      zIndex: "1",
    };
    const likePostClass = {
      color: "red",
    };
    const unlikePostClass = {
      color: "blue",
    };

    const postList = this.state.posts.length ? (
      this.state.posts.map((post) => {
        return (
          <div
            className="post-card"
            style={{ marginTop: "60px" }}
            key={post.sku}
          >
            <div className="card-content">
              <img src={post.imgSrc} />
              <div style={icon}>
                {favouriteItems.indexOf(post.sku) != -1 ? (
                  <BsFillHeartFill
                    color={"green"}
                    size={"2em"}
                    onClick={() => {
                      this.handleClick(post.sku);
                    }}
                  />
                ) : (
                  <BsHeart
                    size={"2em"}
                    onClick={() => {
                      this.handleClick(post.sku);
                    }}
                  />
                )}
              </div>
              <div>{post.title}</div>
              <div>{post.sellingPrice}</div>
              <div>{post.sellingPrice}</div>
              <div>
                <span>{post.reviewCount}</span>
                <span>{post.ratingCount}</span>
                <span>{post.sku}</span>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>No posts</div>
    );

    return <div style={mystyle}>{postList}</div>;
  }
}

export default connect(({ cakes }) => ({
  data: cakes.sampleData || {},
}))(Home);
