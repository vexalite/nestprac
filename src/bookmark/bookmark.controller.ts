import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Get()
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}