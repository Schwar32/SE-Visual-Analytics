# Generated by Django 4.1.2 on 2022-11-17 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bird',
            name='latitude',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='bird',
            name='longitude',
            field=models.FloatField(default=0),
        ),
    ]