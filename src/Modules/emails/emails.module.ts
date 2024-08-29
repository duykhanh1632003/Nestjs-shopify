import { Module } from "@nestjs/common";
import { EmailsService } from "./emails.service";

@Module({
    imports: [EmailsService],
    exports: [EmailsService]
})

export class EmailsModule {}