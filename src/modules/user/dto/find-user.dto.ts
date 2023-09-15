import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
}

// export class FindUserDto {
//     @ApiProperty()
//     status: boolean;
//     @ApiProperty()
//     data: {

//         id: number;

//         name: string;


//         email: string;
//     }[];
//     @ApiProperty()
//     message: string;
// }
