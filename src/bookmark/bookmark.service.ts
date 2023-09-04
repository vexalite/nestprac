import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    getBookmarks(userId: string) {
        return this.prisma.bookmark.findMany({
          where: {
            userId,
          },
        });
      }
    
      getBookmarkById(
        userId: string,
        bookmarkId: number,
      ) {
        return this.prisma.bookmark.findFirst({
          where: {
            id: bookmarkId,
            userId,
          },
        });
      }
    
      async createBookmark(
        userId: string,
        dto: CreateBookmarkDto,
      ) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            },
          }as any);
    
        return bookmark;
      }
    
      async editBookmarkById(
        userId: string,
        bookmarkId: number,
        dto: EditBookmarkDto,
      ) {
        // get the bookmark by id
        const bookmark =
          await this.prisma.bookmark.findUnique({
            where: {
              id: bookmarkId,
            },
          });
    
        // check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
          throw new ForbiddenException(
            'Access to resources denied',
          );
    
        return this.prisma.bookmark.update({
          where: {
            id: bookmarkId,
          },
          data: {
            ...dto,
          },
        });
      }
    
      async deleteBookmarkById(
        userId: string,
        bookmarkId: number,
      ) {
        const bookmark =
          await this.prisma.bookmark.findUnique({
            where: {
              id: bookmarkId,
            },
          });
    
        // check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
          throw new ForbiddenException(
            'Access to resources denied',
          );
    
        await this.prisma.bookmark.delete({
          where: {
            id: bookmarkId,
          },
        });
      }
}
