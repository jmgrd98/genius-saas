// import { authMiddleware } from "@clerk/nextjs";
 
// export default authMiddleware({
//   // Routes that can be accessed while signed out
//   publicRoutes: ['/', '/api/webhook'],
// //   // Routes that can always be accessed, and have
// //   // no authentication information
// //   ignoredRoutes: ['/no-auth-in-this-route'],
// });
 
// export const config = {
//   // Protects all routes, including api/trpc.
//   // See https://clerk.com/docs/references/nextjs/auth-middleware
//   // for more information about configuring your Middleware
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
 
export default authMiddleware({
  afterAuth(auth) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: "https://genius-saas-theta.vercel.app" });
    }
  },
  isSatellite: true,
  signInUrl: 'https://talented-koala-7.clerk.accounts.dev/sign-in',
  domain: url => url.host
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};