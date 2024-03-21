import { Controller } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { ControllerFactory } from 'src/base/controller/base.controller';
import Post from './post.entity';

@Controller('posts')
export default class PostsController extends ControllerFactory<
  Post,
  CreatePostDto,
  UpdatePostDto,
  any
>({
  createDto: CreatePostDto,
  updateDto: UpdatePostDto,
}) {
  constructor(protected service: PostsService) {
    super(service);
  }
}
