import bcrypt from 'bcrypt';

const saltRounds = 10;

function hashPassword(password: string): string {
    return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export { hashPassword, checkPassword }