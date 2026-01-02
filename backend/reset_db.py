from app.database import Base, engine

# WARNING: This will delete all data
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
print("Database wiped and recreated!")