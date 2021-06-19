const graphql = require('graphql')
const User = require('../models/User')
const Post = require('../models/Post')
const Order = require('../models/Order')

const { GraphQLObjectType , GraphQLInt, GraphQLString , GraphQLSchema , GraphQLList} = graphql


const UserType = new GraphQLObjectType({
    name : "UserType",
    description : "Documentation for user",
    fields : () =>({
        id: { type : GraphQLString},
        name : {type : GraphQLString},
        points : { type : GraphQLInt},
        email : { type : GraphQLString},
        phno : { type : GraphQLString},
        password : { type : GraphQLString},

        posts : {
            type : new GraphQLList(PostType),
            resolve(parent ,args){
            return  Post.find({userId : parent.id})
            }
        }


    })
})



const PostType = new GraphQLObjectType({
    name : "PostType",
    description : "Documentation for post ",
    fields : () =>({
       id : { type : GraphQLString},
       productName : { type : GraphQLString},
       imgurl : { type : GraphQLString},
       description: { type : GraphQLString},
       pointsPerDay : { type : GraphQLInt},
       categories : { type : GraphQLString},
       till_date  : { type : GraphQLString},


       user : {
           type : UserType,
           resolve(parent,args){
               return User.findById(parent.userId)
           }
       }


    })
})

const OrderType = new GraphQLObjectType({
    name : "OrderType",
    description : "Documentation for OrderType",
    fields : ()=>({
        id : { type : GraphQLString},
        time : { type : GraphQLString},

        borrower : { type : UserType,

            resolve(parent, args){
                return User.findById(parent.borrowerId)
            }
        },

        lender : { type : UserType,

            resolve(parent, args){
                return User.findById(parent.lenderId)
            }
        },

        post : {
            type : PostType,
            resolve(parent , args){
                return Post.findById(parent.postId)
            }
        }
    })
})



// Root query
const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    description : "Documentation for Root Query ",
    fields : {


        user : {
            type : UserType,
            args : {
                id :{type :GraphQLString }
            },
            resolve(parent ,args){
                return User.findById(args.id)
            }
        },

        users : {
            type : new GraphQLList(UserType),
            resolve(parent ,args){
                return User.find({})
            }
        },

        post : {
            type : PostType,
            args : {
                id : { type : GraphQLString}
            },
            resolve(parent ,args){
                return Post.findById(args.id)
            }

        },
        posts : {
            type : new GraphQLList(PostType),
            resolve(parent ,args){
                return Post.find({})
            }
        },
        order : {
            type : OrderType,
            args : {
                id : { type : GraphQLString}
            },
            resolve(parent ,args){
                return Order.findById(args.id)
            }

        },
        orders : {
            type : new GraphQLList(OrderType),
            resolve(parent ,args){
                return Order.find({})
            }
        }



    }

})


//Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description : "Mutation of types",
    fields : {
        createUser : {
            type : UserType,
            args : {
                name : {type : GraphQLString},
                points : { type : GraphQLInt},
                email : { type : GraphQLString},
                phno : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent ,args){
                const user = new User({
                    name : args.name,
                    points : args.points,
                    email : args.email,
                    phno : args.phno,
                    password : args.password
                })

                user.save()
                return user
            }
        },

        createPost : {
            type : PostType,
            args : {
                  productName : { type : GraphQLString},
                  imgurl : { type : GraphQLString},
                 description: { type : GraphQLString},
                pointsPerDay : { type : GraphQLInt},
                categories : { type : GraphQLString},
                till_date  : { type : GraphQLString},
                userId : { type : GraphQLString}

            },
            resolve(parent , args){
                const post = new Post({
                    productName : args.productName,
                    imgurl : args.imgurl,
                    description : args.description,
                    pointsPerDay : args.pointsPerDay,
                    categories : args.categories,
                    till_date : args.till_date,
                    userId : args.userId
                })
                post.save()
                return post;
            }
        },

        createOrder : {
            type : OrderType,
            args : {
                borrowerId : { type : GraphQLString},
                lenderId : { type : GraphQLString},
                time : { type : GraphQLString},
                postId : { type : GraphQLString}
            },
            resolve(parent ,args){
                const order = new Order({
                    borrowerId : args.borrowerId,
                    lenderId : args.lenderId,
                    time : args.time,
                    postId : args.postId
                })
                order.save()
                return order
            }
        }
    }
   
})





module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : Mutation
   
})