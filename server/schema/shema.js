const graphql = require('graphql');
const {GraphQLInt} = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

const movies = [
    {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1'},
    {id: '2', name: '1984', genre: 'Sci-fi', directorId: '2'},
    {id: 3, name: 'V for Vendetta', genre: 'Sci-fi-Triller', directorId: '3'},
    {id: 4, name: 'Snatch', genre: 'Crime-Comedy', directorId: '4'},
]

const directors = [
    {id: '1', name: 'Quentin Tarantino', age: 55},
    {id: '2', name: 'Michael Redford', age: 72},
    {id: '3', name: 'James McTeigue', age: 51},
    {id: '4', name: 'Guy Ritchie', age: 50},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorsType,
            resolve(parent, args) {
                return directors.find(director => director.id == parent.id)
            }
        }
    })
})

const DirectorsType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id)
            }
        },
        director: {
            type: DirectorsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})