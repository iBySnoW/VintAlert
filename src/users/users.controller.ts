import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/AuthMetadata';


@ApiBearerAuth('JWT-auth')
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly firebaseService: FirebaseService) {}
  
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un utilisateur' })
    @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
    async removeUser(@Param('id') id: string) {
      return this.firebaseService.removeUser(id);
    }
  }
