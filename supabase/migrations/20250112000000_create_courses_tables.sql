CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  color TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subtopics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtopic_id UUID NOT NULL REFERENCES subtopics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS topics_slug_idx ON topics(slug);
CREATE INDEX IF NOT EXISTS topics_display_order_idx ON topics(display_order);

CREATE INDEX IF NOT EXISTS subtopics_topic_id_idx ON subtopics(topic_id);
CREATE INDEX IF NOT EXISTS subtopics_topic_display_order_idx ON subtopics(topic_id, display_order);

CREATE INDEX IF NOT EXISTS courses_subtopic_id_idx ON courses(subtopic_id);
CREATE INDEX IF NOT EXISTS courses_subtopic_display_order_idx ON courses(subtopic_id, display_order);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtopics ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access on topics" ON topics
  FOR SELECT USING (true);

CREATE POLICY "Authenticated write access on topics" ON topics
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access on subtopics" ON subtopics
  FOR SELECT USING (true);

CREATE POLICY "Authenticated write access on subtopics" ON subtopics
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access on courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Authenticated write access on courses" ON courses
  FOR ALL USING (auth.role() = 'authenticated');

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON topics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtopics_updated_at
  BEFORE UPDATE ON subtopics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

