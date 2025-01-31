# Generated by Django 4.2.18 on 2025-01-31 16:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='date_time',
        ),
        migrations.AddField(
            model_name='event',
            name='end_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='start_time',
            field=models.DateTimeField(default=None),
            preserve_default=False,
        ),
    ]
