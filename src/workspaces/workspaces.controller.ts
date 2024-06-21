import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get('available/:sessionId')
  async getAvailableWorkspaces(@Param('sessionId') sessionId: number){
    return this.workspacesService.findAvailableWorkspaces(sessionId);
  }

  @Get('occupied/:sessionId')
  async getOccupiedWorkspaces(@Param('sessionId') sessionId: number){
    return this.workspacesService.findOccupiedWorkspaces(sessionId);
  }
  @Get('user/:userId')
  async getWorkspacesByUserId(@Param('userId') userId: number) {
    return this.workspacesService.findWorkspacesByUserId(userId);
  }
  @Get('session/:sessionId')
  async getWorkspacesBySessionId(@Param('sessionId') sessionId: number) {
    return this.workspacesService.findWorkspacesBySessionId(sessionId);
  }
  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
