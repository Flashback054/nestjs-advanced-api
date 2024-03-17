import { Controller } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import BaseController from 'src/base/controller/base.controller';
import Post from './post.entity';

@Controller('posts')
export default class PostsController extends BaseController<
  Post,
  CreatePostDto,
  UpdatePostDto,
  any
> {
  constructor(private readonly postsService: PostsService) {
    super(postsService);
  }
}

// @Controller('posts')
// export default class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @Get()
//   getAllPosts() {
//     return this.postsService.findAll();
//   }

//   @Get(':id')
//   getPostById(@Param('id') id: string) {
//     return this.postsService.findOneById(Number(id));
//   }

//   @Post()
//   async createPost(@Body() post: CreatePostDto) {
//     return this.postsService.create(post);
//   }

//   @Put(':id')
//   async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
//     return this.postsService.update(Number(id), post);
//   }

//   @Delete(':id')
//   async deletePost(@Param('id') id: string) {
//     this.postsService.delete(Number(id));
//   }
// }
