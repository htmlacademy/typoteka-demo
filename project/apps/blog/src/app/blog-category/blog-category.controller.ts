import { BlogCategoryService } from './blog-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class BlogCategoryController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.blogCategoryService.getCategory(id);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.blogCategoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.blogCategoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogCategoryService.deleteCategory(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.blogCategoryService.updateCategory(id, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}
