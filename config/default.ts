import dotenv from 'dotenv';

dotenv.config(); 

export default {
    port: 1337,
    dbUri: process.env.DB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "45m",
    refreshTokenTtl: "1y",
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAgILNWrcSUZqz3XsFWLWdqjxREHpxBpf2xxnXclGaDpgSL02R
eqHj3723CRPZVjf26XL2nyM3UzFAcG1vLxON8hq97+l7Y/batDUJ8L0d9Mlgufb0
9zBWE7pC/u5UGOfAnO4/7ia25L7G4wl/kxUL67oU99zjC6Ud4nEk4qVW+9TVntkf
X6j/5Jlhov0I33kt8tOW5J7dixBaAI/MAgdZw1u53/by8chplgUEIwYF2f0WA34F
TGYqU1tnEb52GMdcJvIWbxLJ0ZM5zME2BLejqFzYCQBawjR0ymbFAnacKhbfTx2Y
Jo5astCXSARhqhWswphHf34itPaXA7q951eSUQIDAQABAoIBAHE/0+xvjMsxQ/SY
ZxvH4QuWX/HflR80aBsJYN2zn8ngpZXeC6hAZmpT66sqPMtIQmV0FHYlOKotqxXo
uqSH3P1QJ7X20fBEKHPKkdn/Lxj7Jix7v2DezdxQtp2mNaJFCW7CXsBmiaKHpQmK
40wgrgKsV7IejE9E0VMuVk0NW9xMcGPDwNc5bbknEVfSZsD3pBb1jZ2q4cmUDH7D
UM9eMbACTi1Y0nghs9noZYtPcVK2KPpcW3Ksbl7KlrgGQ3qwmxHBljo2hcmDxI2C
9C2B66eRo9Ou+1CANH4X9AIRYJvWjD3IiGi/VWLRtFPQA9M6TqQ1pWYy7Yzck+9F
8E1UkCkCgYEAx0AS0zAeziDWjfOCjdclS2RdE83Lc4Zr9tf9ydYI+hwFGBtpwnbu
I90hHyZRDSJoMw+XP9FVqY61YGz2Oi/I5GNSpqcO76jWZO6hUjIJ3zdwPYI09KVc
oiwY+WfiNPoZiaZeJOdw5B6buk9jin5Cq1gUsRpx8XaWzBH+CZ1411cCgYEApRzq
HDrFVHFWgEBRqahHzlCKi3qlSDjVDEs1HLGGh4T+pOPORP+id1DY53GwA1rKvnGP
Pwthoe+vTRVvxUEWRZy4LfDBkTLPeYYjyHsOCcKhAQUcadRYfxtjw0eBuuDYTesb
9SIyr5TXB2k28ozcq05kciC/r9krLKFketPhIpcCgYEAlx0ZKeJM+rgdAPu2AC0z
s8IidWqW6r8AEu4tJG6X0Fh/5JCl3T6lzb1f6Wf+AKAfttoUM+pntXjuRntdIzQq
gExz2sDIqyq5r0LsRpJ8ujYpgfzGfOUNJFGdf0oyXUtxItxyejqte9Va9ipPrDGm
Dp120/rif+cY5xyeNlyf0XECgYBwqCXkVQVG9H38y+XsSHGWB8ZAHNKhUIWs+bOn
fEk6Njg48WZQFcwYdQVKBXv/Dfe/sWP3tCBNiWimw7WbdSlpHeFdFyQ7mduOI0RP
CgcuCaopM/+LBePL9jg/iY6un7N2lrBgtZC31GpTGCrxm8ME71wBsu6XYSngLc6N
L/wwyQKBgC4kL0MvCm6x29+AJee5okqw8BEuqaDEn5cUFJKuPcSbSrMWQKQWgy2e
nmNau5W09u4EfrTwMEi6m8DMSEKfxzXbHFjifRWbvwsPJSprIqUBPCbAQAeZc2Oc
x7Yf5jEyfwiFVr58S3tZp5z3hO33rBWUSr/ZbgngGBUl1clMIyTX
-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgILNWrcSUZqz3XsFWLWd
qjxREHpxBpf2xxnXclGaDpgSL02ReqHj3723CRPZVjf26XL2nyM3UzFAcG1vLxON
8hq97+l7Y/batDUJ8L0d9Mlgufb09zBWE7pC/u5UGOfAnO4/7ia25L7G4wl/kxUL
67oU99zjC6Ud4nEk4qVW+9TVntkfX6j/5Jlhov0I33kt8tOW5J7dixBaAI/MAgdZ
w1u53/by8chplgUEIwYF2f0WA34FTGYqU1tnEb52GMdcJvIWbxLJ0ZM5zME2BLej
qFzYCQBawjR0ymbFAnacKhbfTx2YJo5astCXSARhqhWswphHf34itPaXA7q951eS
UQIDAQAB
-----END PUBLIC KEY-----`
};
