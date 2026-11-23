import { Container, LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="display text-6xl sm:text-8xl">Wrong turn.</h1>
      <p className="mt-5 max-w-lg text-lg text-steel-600">
        We couldn&rsquo;t find that page. Try the services list or head back
        home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/services" variant="outline">
          See services
        </LinkButton>
      </div>
    </Container>
  );
}
