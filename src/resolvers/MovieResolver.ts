import { Movie } from "../entity/Movie"
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql"

@InputType()
class MovieInput {
  @Field()
  title: string

  @Field()
  minutes: number
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Int, { nullable: true })
  minutes?: number
}

@Resolver()
export class MovieResolver {
  // mutations used when you want to update or make a change in db
  @Mutation(() => Movie) // tells graphql what return value of mutation will be
  async createMovie(
    @Arg("options") options: MovieInput
    // @Arg("title", () => String) title: string, // 'title' will be name of attribute in graphql schema
    // @Arg("minutes", () => Int) minutes: number
  ) {
    // await Movie.insert(options)

    // will create AND return Movie
    const movie = await Movie.create(options).save()
    return movie
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    // @Arg("input", () => MovieInput) input: MovieInput
  ) {
    await Movie.update({ id }, input)
    return true
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await Movie.delete({ id })
    return true
  }

  // how you fetch records from db in graphql
  @Query(() => [Movie])
  movies() {
    return Movie.find()
  }
}
